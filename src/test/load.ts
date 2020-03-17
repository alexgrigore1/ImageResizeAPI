import http from "http";
const numberOfRequests = process.argv[2] || 100;

const startTime = new Date().getTime();
for(let i=0;i<numberOfRequests;i++) {
    http.get(`http://localhost:4000/image/4.jpg?size=700x${i+1}`, () => {
        const executionTime = new Date().getTime() - startTime;
        console.log(`request ${i}: ${executionTime}`);
    });
}
console.log(`STARTED ${numberOfRequests} REQUESTS`);