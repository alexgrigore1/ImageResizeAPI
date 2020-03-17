# Image Resize API
**POC for:** 
- Node.js with Typescript
- Mongodb
- Redis Simple Message Queue
- Jest
- Docker

## Quick Start
1. Clone the repo and cd into the project directoy
2. run `npm install`
3. run `docker-compose up`
4. Test it: http://localhost:4000/image/4.jpg?size=500x604

## Endpoints
1. **Original image**: http://localhost:4000/image/4.jpg
2. **Resized Image**: http://localhost:4000/image/4.jpg?size=500x604
3. **Report**: http://localhost:4000/report

## Manual Testing
There is a bunch of images added in `seed/images` directory. So, you can manually access one of those images without adding others: 
```
1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg
```
When the docker container is running, it's exposing the `seed/images` directory to the local machine so you can manually add images anytime to make them available through the API. 

## Load Test
There is a script which is running multiple concurrent requests:
```
yarn test:load <number_of_requests>
```
If `number_of_requests` is not provided it's running 100 requests. The very first call is going to be slower becaus of the big amount of non-cached images. The requests looks like this:
```
http://localhost:4000/image/4.jpg?size=500xi
```
where `i` represents a number between 1 and `number_of_requests`.
 

## Unit Tests
You can run unit tests by calling `yarn test:unit`. <br>
**NOTE:** There issingle unit test as a POC

## Clear Cache
Run `yarn clean-cache` to manually clear the cache. 
<br> **NOTE**: it will ask for admin password

## Design decisions
### RSMQ
The most expensive actions in a non cached resized image call are:
- resize image
- caching the image

Because resizing is the most important action and we really expect the server to respond as fast as possible, we are focusing on this thing first. 

Anyway, we still care about caching so we are queueing theese actions using RSMQ. In this way, the messages are processed one by one, so there will be only one write action at at a time and will be left some resources for the other requests.

## Known limitations
1. Cache is never expiring or invalidating
2. The system is not scalling on demand
3. Reading/writing files from/to the disk are on the same machine with the server itself (RSMQ helps a lot but the I/O )