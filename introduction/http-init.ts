import { IncomingMessage, ServerResponse, createServer } from "http";

export interface Page {
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
  console.log('http://localhost:3000');
  let page = router.get(req.url === undefined ? "" : req.url);
  if (page === undefined) {
    page = new Root();
  }

  page.page(resp);

}).listen(3000);
