import { opine } from "https://deno.land/x/opine@main/mod.ts";
// [Explanation Router]
// import { Router } from "https://deno.land/x/opine@main/mod.ts";

// const router = Router(options);

const app = opine();

// 1-) response simple
app.use((req, res) => {
    res.send("Hello World");
});

// 2-) response with content-type JSON
// app.use((req, res) => {
//     res.json({
//         result: "Hello World!"
//     });
//     // res.setStatus(500).json({ error: "message" });
// });

// 3-) response with content-type HTML
// enable cors
// req.accepts();
// app.use((req, res) => {
//     res.format({
//         text: () => {
//             res.send("hey");
//         },

//         html: () => {
//             res.send("<h1>hey</h1>");
//         },

//         json: () => {
//             res.send({ message: "hey" });
//         },
//         default: () => {
//             // log the request and respond with 406
//             res.setStatus(406).send("Not Acceptable, so sorry!");
//         }
//       });
// });


// This method is just like the router.METHOD() methods, except that it matches all HTTP methods (verbs).
// router.all("*", requireAuthentication);
// router.all("*", loadUser);

// invoked for any requests passed to this router
// router.use(function (req, res, next) {
//     // .. some logic here .. like any other middleware
//     next();
//   });

// // will handle any request that ends in /events
// // depends on where the router is "use()'d"
// router.get("/events", function (req, res, next) {
// // ..
// });

app.listen(3000, () => {
    console.log(`Servidor Deno con Opine en http://localhost:3000`);
});
