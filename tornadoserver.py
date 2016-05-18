import time
import tornado.ioloop
from tornado.web import RequestHandler, asynchronous
from tornado import gen
from tornado.httputil import HTTPHeaders

class MainHandler(RequestHandler):

    @asynchronous
    @gen.engine
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write('sleeping')
        self.flush()
        yield gen.sleep(2)
        self.write("Hello, world {}".format(time.time()))
        self.finish()

def make_app():
    return tornado.web.Application([
        (r"/*", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
