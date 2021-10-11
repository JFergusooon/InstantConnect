
db.createUser(
    {
        user : "test",
        pwd : "test",
        roles : [
            {
                role: "readWrite",
                db: "instantconnect"
            }
        ]
    }
)
db.posts.insertOne({username:"jferguson", post:"test"})