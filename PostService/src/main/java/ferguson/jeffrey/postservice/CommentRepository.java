package ferguson.jeffrey.postservice;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, Integer> {

    List<Comment> findAll();

}
