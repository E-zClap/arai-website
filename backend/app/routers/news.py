"""News routes: public list + admin CRUD."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_admin
from ..models import News
from ..schemas import NewsIn
from ..serializers import news_to_dict

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("")
def list_news(db: Session = Depends(get_db)):
    rows = db.query(News).order_by(News.date.desc(), News.id.desc()).all()
    return [news_to_dict(n) for n in rows]


@router.post("", dependencies=[Depends(get_current_admin)])
def create_news(payload: NewsIn, db: Session = Depends(get_db)):
    n = News(
        date=payload.date,
        title_en=payload.title.EN,
        title_jp=payload.title.JP,
        link=payload.link or "#",
        tags=payload.tags or [],
    )
    db.add(n)
    db.commit()
    db.refresh(n)
    return news_to_dict(n)


@router.put("/{news_id}", dependencies=[Depends(get_current_admin)])
def update_news(news_id: int, payload: NewsIn, db: Session = Depends(get_db)):
    n = db.get(News, news_id)
    if not n:
        raise HTTPException(status_code=404, detail="News not found")
    n.date = payload.date
    n.title_en = payload.title.EN
    n.title_jp = payload.title.JP
    n.link = payload.link or "#"
    n.tags = payload.tags or []
    db.commit()
    db.refresh(n)
    return news_to_dict(n)


@router.delete("/{news_id}", dependencies=[Depends(get_current_admin)])
def delete_news(news_id: int, db: Session = Depends(get_db)):
    n = db.get(News, news_id)
    if not n:
        raise HTTPException(status_code=404, detail="News not found")
    db.delete(n)
    db.commit()
    return {"status": "deleted", "id": news_id}
