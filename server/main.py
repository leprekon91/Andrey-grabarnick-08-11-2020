from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import literal, or_, and_
from .models import db
from .models.messages import Message

main = Blueprint('main', __name__)


@main.route('/api/send', methods=['POST'])
@login_required
def sendMessage():
    form = request.get_json()
    sender = current_user.email
    receiver = form['toEmail']
    title = form['title']
    body = form['body']
    sent_at = form['sentAt']
    new_message = Message(
        sender=sender,
        receiver=receiver,
        title=title,
        body=body,
        sent_at=sent_at
    )
    new_message.save()
    return "Sent successfully"


@main.route('/api/getall/<page_>/<query_>')
@login_required
def get_all_messages(page_, query_):
    
    email = current_user.email
    if query_ != 'none':
        search_string = literal(query_)
        print(search_string)
        messages = Message.query.filter(
            Message.sender.contains(search_string) |
            Message.receiver.contains(search_string),
            (Message.sender == email) |
            (Message.receiver == email)
        ).paginate(int(page_), 5)
        print(messages.items)
    else:
        messages = Message.query.filter(
            (Message.sender == email) |
            (Message.receiver == email)
        ).paginate(int(page_), 5)

    return {
        "data": [e.serialize() for e in messages.items],
        "page": messages.page,
        "pages": messages.pages,
        "total": messages.total,
        "hasPrev": messages.has_prev,
        "nextNum": messages.next_num,
        "hasNext": messages.has_next,
    }


@main.route('/api/getsent/<page_>')
@login_required
def get_sent_messages(page_):

    email = current_user.email
    messages = Message.query.filter(
        Message.sender == email).paginate(int(page_), 5)

    return {
        "data": [e.serialize() for e in messages.items],
        "page": messages.page,
        "pages": messages.pages,
        "total": messages.total,
        "hasPrev": messages.has_prev,
        "nextNum": messages.next_num,
        "hasNext": messages.has_next,
    }


@main.route('/api/getinbox/<page_>')
@login_required
def get_inbox_messages(page_):

    email = current_user.email

    messages = Message.query.filter(
        Message.receiver == email).paginate(int(page_), 5)

    return {
        "data": [e.serialize() for e in messages.items],
        "page": messages.page,
        "pages": messages.pages,
        "total": messages.total,
        "hasPrev": messages.has_prev,
        "nextNum": messages.next_num,
        "hasNext": messages.has_next,
    }


@main.route('/api/receive', methods=['POST'])
@login_required
def receive_message():
    form = request.get_json()
    receiver = current_user.email
    message_id = form['message_id']
    message = Message.query.filter(
        (Message.receiver == receiver) &
        (Message.id == message_id)
    ).first()
    if message and message.received == False:
        message.receive()
        return "Message received"
    return "Error receiving message id:" + str(message_id)


@main.route('/api/see', methods=['POST'])
@login_required
def see_message():
    form = request.get_json()
    receiver = current_user.email
    message_id = form['message_id']
    message = Message.query.filter(
        (Message.receiver == receiver) &
        (Message.id == message_id)
    ).first()
    if message and message.seen == False:
        message.see()
        return "Message seen"
    return "Error receiving message id:" + str(message_id)


@main.route('/api/delete', methods=['POST'])
@login_required
def delete_message():
    form = request.get_json()
    receiver = current_user.email
    message_id = form['message_id']
    message = Message.query.filter(
        Message.receiver == receiver,
        Message.id == message_id
    ).first()
    if message:
        db.session.delete(message)
        db.session.commit()
    print(str(message)+" to be deleted")
    return "message id:" + str(message_id)+" is DELETED"
