package ferguson.jeffrey.postservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/post")
public class PostRestController {

    @Autowired
    protected PostRepository postRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @PostMapping("/create/{username}/{post}/{privacy}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createPost(@PathVariable String username, @PathVariable String post, @PathVariable Boolean privacy){
        Post posts = new Post();
        User user = userRepository.findByUsername(username);

        LocalDate date = LocalDate.now();
        //generate sequence
        posts.setPostId(sequenceGeneratorService.getSequenceNumber(Post.SEQUENCE_NAME));
        posts.setUsername(username);
        posts.setDate(date);
        posts.setPostBody(post);
        posts.setPrivate(privacy);
        posts.setPostColor(user.getPageColor());
        postRepository.save(posts);


    }

    @DeleteMapping(path="/{postId}")
    @ResponseStatus(code=HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int postId) {
        postRepository.deleteById(postId);
    }

    @GetMapping()
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    @GetMapping("/getUserPosts/{username}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Post> getUserPosts(@PathVariable String username){
        return postRepository.getPostsByUsernameOrderByDateDesc(username);
    }

    @PutMapping(path="/updatePostColor/{id}/{color}")
    public void updatePostColor(@PathVariable int id,@PathVariable String color){
        Post post = postRepository.findByPostId(id);
        post.setPostColor(color);
        postRepository.save(post);
    }





    @GetMapping("/getUsername/{username}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User getUsername(@PathVariable String username) throws URISyntaxException {
        ServiceInstance serviceInstance = loadBalancerClient.choose("USER-SERVICE");
        String url = serviceInstance.getUri().parseServerAuthority() + "/user/getByUsername/" + username;
        User user = restTemplate().getForObject(url, User.class);


        return user;

    }

    @GetMapping("/getFriendsPosts/{username}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Post> getFriendsPosts(@PathVariable String username){
        User user = userRepository.findByUsername(username);
        List<User> friends = new ArrayList<>();
        List<Post> posts = new ArrayList<>();

        for (int i = 0; i < user.getFriends().size(); i++) {
            friends.add(user.getFriends().get(i));

            posts.addAll(postRepository.getPostsByUsernameAndIsPrivateFalseOrderByPostIdDesc(friends.get(i).getUsername()));
        }



        return posts;
    }



    @PutMapping("/addLikes/{postId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addLikes(@PathVariable int postId){
        Post post = postRepository.findByPostId(postId);

        int postLikes = post.getLikes();

        post.setLikes(postLikes + 1);

        postRepository.save(post);

        System.out.println("Test");
    }

    @GetMapping("/getTrending")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Post> getTrending(){
        return postRepository.findPostsByIsPrivateFalseOrderByLikesDesc();
    }
}
