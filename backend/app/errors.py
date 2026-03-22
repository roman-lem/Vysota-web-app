        
class ValidationError(Exception):
    def __init__(self, param, value, condition, *args):
        self.param = param
        self.value = value
        self.condition = condition
        super().__init__(*args)
        
class UnauthorizedError(Exception):
    def __init__(self, message, *args):
        self.message = message
        super().__init__(*args)
        
class ForbiddenError(Exception):
    def __init__(self, *args):
        super().__init__(*args)
        
class NotFoundError(Exception):
    def __init__(self, object, *args):
        self.object = object
        super().__init__(*args)



def formatError(message = 'Unrecognized error', desc = '', code = 400):
    return {
        'error': {
            'message':message,
            'description': desc
        }
    }, code
    


def register_error_handlers(app):

    @app.errorhandler(ValidationError)
    def validationHandler(error):
        message = 'Validation error'
        desc = f'The value of {error.param} is {error.value}, but it must be {error.condition}'
        return formatError(message, desc, 400)
        
    @app.errorhandler(UnauthorizedError)
    def unauthorizedHandler(error):
        message = f'Unauthorized error: {error.message}'
        desc = "User isn't authorized"
        return formatError(message, desc, 401)
    
    @app.errorhandler(ForbiddenError)
    def forbiddenHandler(error):
        message = "Forbidden"
        desc = "User has no permissions"
        return formatError(message, desc, 403)
    
    @app.errorhandler(NotFoundError)
    def notFoundHandler(error):
        message = f"{error.object} not found"
        desc = ""
        return formatError(message, desc, 404)
    
    @app.errorhandler(Exception)
    def defaultExceptionHandler(error):
        message = "Server error"
        desc = str(error)
        return formatError(message, desc, 500)