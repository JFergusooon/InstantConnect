
db.createUser(
    {
        user : "test",
        pwd : "test",
        roles : [
            {
                role: "readWrite",
                db: "Socialite"
            }
        ]
    }
)
db.posts.insertOne({username:"jferguson", post:"test"})