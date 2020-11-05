from . import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    sender = db.Column(  # user email
        db.String(100),
        nullable=False,
        unique=False
    )
    receiver = db.Column(  # user email
        db.String(100),
        nullable=False,
        unique=False
    )
    title = db.Column(
        db.String(100),
        nullable=False,
        unique=False
    )
    body = db.Column(
        db.String(500),
        nullable=False,
        unique=False
    )
    received = db.Column(
        db.Boolean,
        default=False,
        nullable=False
    )
    seen = db.Column(
        db.Boolean,
        default=False,
        nullable=False
    )

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self
