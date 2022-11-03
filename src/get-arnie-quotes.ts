import { httpGet } from "./mock-http-interface";

enum Statuses {
  SUCCESS = "Arnie Quote",
  FAILURE = "FAILURE"
}

type TResult = {[Statuses.SUCCESS] : string} | {[Statuses.FAILURE] : string};

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const promises = urls.map(url => httpGet(url));
  return Promise.all(promises).then(responses => 
    responses.map(response => 
      response.status === 200
      ? { [Statuses.SUCCESS]: JSON.parse(response.body).message}
      : { [Statuses.FAILURE]: JSON.parse(response.body).message}
    )
  );
};
