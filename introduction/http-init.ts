import { IncomingMessage, ServerResponse, createServer } from "http"

interface Page {
  page(response: ServerResponse): void;
}

class First implements Page {
  page(response: ServerResponse): void {
      response.end("I am first page.");
  }
}

class Root implements Page {
  page(response: ServerResponse): void {
      response.end("I am main page.");
  }
}

const router = new Map<string, Page>();
router.set("/first", new First());
router.set("/main", new Root());


const server = createServer((req: IncomingMessage, resp: ServerResponse) => {
  console.log('http://localhost:3000')
  if (req.url === "/first") {
    resp.end("I am first page.");
  } else {
    resp.end("I am main page.");
  }
}).listen(3000)
