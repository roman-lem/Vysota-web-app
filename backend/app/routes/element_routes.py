from flask import Blueprint, request, g
from app.validators.element_validator import elementGetValidator
from app.services.element_service import fetchElements


elementBP = Blueprint("element", __name__)


@elementBP.route("/elements", methods = ["GET"])
def getElements():
    validated = elementGetValidator(**request.args)
    return fetchElements(g.user, **validated)