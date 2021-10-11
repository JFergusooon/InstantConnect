package ferguson.jeffrey.postservice;

import org.springframework.data.annotation.Id;

public class Comment {

    @Id
    private int id;

    private String username;
    private String commentBody;

    Comment(){}

    Comment(String username, String commentBody){
        this.username = username;
        this.commentBody = commentBody;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }
}
