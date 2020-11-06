from flask import Blueprint, request
from flask_login import login_required, current_user

from .models.messages import Message

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return app.send_static_file('index.html')


@main.route('/api/send', methods=['POST'])
@login_required
def sendMessage():
    form = request.get_json()
    sender = current_user.email
    receiver = form['toEmail']
    title = form['title']
    body = form['body']
    new_message = Message(
        sender=sender,
        receiver=receiver,
        title=title,
        body=body
    )
    new_message.save()
    return "Sent successfully"


@main.route('/api/getall/<page_>')
@login_required
def get_all_messages(page_):

    email = current_user.email

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
    Message.query.filter(
        (Message.receiver == receiver) &
        (Message.id == message_id)
    ).delete()
    return "message id:" + str(message_id)+" is DELETED"
