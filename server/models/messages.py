from . import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    sender = db.Column(
        db.String(100),
        nullable=False,
        unique=False
    )
    receiver = db.Column(
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

    def receive(self):
        self.received = True
        self.save()

    def see(self):
        self.seen = True
        self.save()

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def serialize(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'receiver': self.receiver,
            'title': self.title,
            'body': self.body,
            'received': self.received,
            'seen': self.seen
        }

    def __repr__(self):
        return '<Message {}>'.format(self.id)
