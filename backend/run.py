from app import createApp

application = createApp()

@application.route('/')
def index():
    return 'Hello World'

# if __name__ == "__main__":
#     application.run()