package ferguson.jeffrey.postservice;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



@Document(collection = "Posts")
public class Post {

    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private int postId;
    private String username;
    private int likes = 0;
    private int dislikes = 0;
    private String postBody;
    private String postColor;

    private Boolean isPrivate;

    private LocalDate date;

    @DBRef
    List<Comment> comments = new ArrayList<>();



    Post(){}

    Post(String username, int likes, int dislikes, String post, Boolean isPrivate){
        this.username = username;
        this.likes = likes;
        this.dislikes = dislikes;
        this.postBody = post;
        this.isPrivate = isPrivate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

    public String getPostBody() {
        return postBody;
    }

    public void setPostBody(String postBody) {
        this.postBody = postBody;
    }

    public Boolean getPrivate() {
        return isPrivate;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPostColor() {
        return postColor;
    }

    public void setPostColor(String postColor) {
        this.postColor = postColor;
    }
}
