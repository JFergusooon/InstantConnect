package ferguson.jeffrey.postservice;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostRepository extends MongoRepository<Post, Integer> {

    Post findByPostId(int postId);

    Post findByUsername(String username);

    List<Post> findAllByOrderByLikesDesc();

    List<Post> getPostsByUsernameOrderByDateDesc(String username);

    List<Post> getPostsByUsernameAndIsPrivateFalseOrderByLikesDesc(String username);
    List<Post> getPostsByUsernameAndIsPrivateFalseOrderByPostIdDesc(String username);

    List<Post> findPostsByIsPrivateFalseOrderByLikesDesc();

    //List<Post> findPostsByIsPrivateFalseOrderByDateDescLikesDesc();

    Post deleteAllByUsername(String username);

    Post deleteAllPostsByUsername(String username);




}
