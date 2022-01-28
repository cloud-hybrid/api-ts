/***
 * @type {import("socket.io").Socket} Socket
 */

import Cluster from "cluster";
import HTTP from "http";
//import Express from "express";
//import Redis from "redis";
import OS from "os";

import { Server } from "socket.io";

const IO = new Server({
    path: "/test",
    serveClient: false
});

export const Link = ($) => {
    IO.attach($, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
};

//
//import * as Sticky from "@socket.io/sticky";
//import * as Adapter from "@socket.io/cluster-adapter";
//
//if ( Cluster.isMaster ) {
//    console.debug("[Debug] Primary Node PID" + ":", "\t" + process.pid);
//    console.debug("  --> http://localhost:3000", "\n");
//
//    const httpServer = HTTP.createServer();
//
//    // setup sticky sessions
//    Sticky.setupMaster(httpServer, {
//        loadBalancingMethod: "least-connection"
//    });
//
//    // setup connections between the workers
//    Adapter.setupPrimary();
//
//    // Node.js > 16.0.0
//    Cluster.setupPrimary({
//        serialization: "advanced"
//    });
//
//    httpServer.listen(2500);
//    for ( let i = 0; i < OS.cpus().length; i++ ) {
//        Cluster.fork();
//    }
//
//    Cluster.on("start", (event) => console.log(JSON.stringify(event, null, 4) + "\n"));
//
//    Cluster.on("exit", (worker) => {
//        console.warn("[Warning] Worker Node Failure", JSON.stringify(worker, null, 4));
//        console.debug("[Debug] Forking Additional Node ...");
//
//        Cluster.fork();
//    });
//} else {
//    console.debug("[Debug] Auxiliary Node PID" + ":", "\t" + process.pid, "\n");
//
//    const httpServer = HTTP.createServer(Application).listen(2500, "localhost");
//
//    const io = new Server(httpServer);
//
//    // use the cluster adapter
//    io.adapter(Adapter.createAdapter());
//
//    // setup connection with the primary process
//    Sticky.setupWorker(io);
//
//    io.on("connection", ($) => {
//        /***
//         *
//         * @type {Socket}
//         */
//        const socket = $;
//
//        console.debug("[Debug] Connection Event ...");
//        console.debug("[Debug] Namespace" + ":", "\"" + socket?.nsp.name + "\"");
//
//        let counter = 0;
//        socket?.nsp.sockets.forEach((socket, index) => {
//            const $ = {
//                ID: socket.id,
//                Connection: socket.connected,
//                Handshake: socket.handshake
//            };
//
//            counter += 1;
//            console.debug("[Debug] Socket (" + counter + ")" + ":", JSON.stringify($, null, 4));
//        });
//
//        console.debug("[Debug] Total Socket(s)" + ":", counter);
//
//        const TTY = {rows: null, columns: null};
//        if ( process.stdout.isTTY ) {
//            TTY.rows = process.stdout.rows;
//            TTY.columns = process.stdout.columns;
//
//            process.stdout.on("resize", () => {
//                TTY.rows = process.stdout.rows;
//                TTY.columns = process.stdout.columns;
//            });
//        }
//
//        console.debug("\n" + (TTY?.columns) ? "-".repeat(TTY.columns) : "");
//
//        socket.on("Message", ($) => {
//            console.debug("[Debug] Message Event ...", JSON.stringify($, null, 4));
//            const TTY = {rows: null, columns: null};
//            if ( process.stdout.isTTY ) {
//                TTY.rows = process.stdout.rows;
//                TTY.columns = process.stdout.columns;
//
//                process.stdout.on("resize", () => {
//                    TTY.rows = process.stdout.rows;
//                    TTY.columns = process.stdout.columns;
//                });
//            }
//
//            console.debug("\n" + (TTY?.columns) ? "-".repeat(TTY.columns) : "");
//            io.emit("Broadcast", JSON.stringify($, null, 4));
//        });
//
//        socket.on("Broadcast", async (data) => {
//            console.debug("[Debug] Broadcast Event ...");
//
//            console.debug("[Debug] Data" + ":", JSON.stringify(data, null, 4));
//
//            try {
//                // await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
//
//                socket.emit("Accepted", true);
//                socket.broadcast.emit("Accepted", true);
//
//            } catch ( e ) {
//                // no available points to consume
//                // emit error or warning message
//                console.warn(e);
//
//                socket.emit("blocked", {"retry-ms": e?.msBeforeNext});
//
//                console.warn("[Warning] Connection Rejected ...", JSON.stringify(data, null, 4));
//            }
//            finally {
//                const TTY = {rows: null, columns: null};
//                if ( process.stdout.isTTY ) {
//                    TTY.rows = process.stdout.rows;
//                    TTY.columns = process.stdout.columns;
//
//                    process.stdout.on("resize", () => {
//                        TTY.rows = process.stdout.rows;
//                        TTY.columns = process.stdout.columns;
//                    });
//
//                }
//
//                console.debug("\n" + (TTY?.columns) ? "-".repeat(TTY.columns) : "");
//
//            }
//        });
//
//        socket.on("disconnect", () => {
//            console.log("[Debug] Disconnect Event ...");
//            const TTY = {rows: null, columns: null};
//            if ( process.stdout.isTTY ) {
//                TTY.rows = process.stdout.rows;
//                TTY.columns = process.stdout.columns;
//
//                process.stdout.on("resize", () => {
//                    TTY.rows = process.stdout.rows;
//                    TTY.columns = process.stdout.columns;
//                });
//
//            }
//
//            console.debug("\n" + (TTY?.columns) ? "-".repeat(TTY.columns) : "");
//        });
//    });
///};