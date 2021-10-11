package ferguson.jeffrey.postservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentRestController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/postComment/{postId}/{username}/{comment}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void makeComment(@PathVariable int postId, @PathVariable String username, @PathVariable String comment){

        Post post = postRepository.findByPostId(postId);
        Comment comment1 = new Comment();
        comment1.setUsername(username);
        comment1.setCommentBody(comment);
        post.getComments().add(comment1);


        commentRepository.save(comment1);
        postRepository.save(post);

    }

    @GetMapping()
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Comment> getComments(){
        return commentRepository.findAll();
    }


}
