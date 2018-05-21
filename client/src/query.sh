#!/bin/bash

curl --request GET \
  --url 'http://localhost:8000/graphql?variables=%7B%0A%20%20"id"%3A%205%0A%7D&query=query%20(%24id%3A%20Int!)%20%7B%0A%09post%20(id%3A%20%24id)%20%7B%0A%09%09title%0A%09%09id%0A%09%7D%0A%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d52b117ff5f6f77ffb4845b6b0cb27add1e1583727c58e1d9a058b361f13de4b%22%7D%7D'


curl --request GET \
  --url 'http://localhost:8000/graphql?variables=%7B%0A%20%20"id"%3A%205%0A%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d52b117ff5f6f77ffb4845b6b0cb27add1e1583727c58e1d9a058b361f13de4b%22%7D%7D'



# http://localhost:8000/graphql?variables={
#   "id": 5
# }&extensions={"persistedQuery":{"version":1,"sha256Hash":"d52b117ff5f6f77ffb4845b6b0cb27add1e1583727c58e1d9a058b361f13de4b"}}
