
# FROM ubuntu:22.04
FROM node:16


WORKDIR /myfolder/  
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install 

# RUN mkdir myfolder => COPY시 myfolder 없으면 어처피 자동으로 만들어짐.
COPY . /myfolder/
CMD yarn start:dev


