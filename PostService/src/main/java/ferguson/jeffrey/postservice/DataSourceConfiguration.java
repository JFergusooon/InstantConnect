package ferguson.jeffrey.postservice;


import com.mongodb.ConnectionString;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfiguration {

    @Bean
    public DataSource getDataSource(){
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:mysql://" + System.getenv("DATABASE_HOST") + "/" + System.getenv("DATABASE_NAME"));
        dataSourceBuilder.username(System.getenv("DATABASE_USERNAME"));
        dataSourceBuilder.password(System.getenv("DATABASE_PASSWORD"));
        return dataSourceBuilder.build();
    }

    @Bean
    public MongoClientFactoryBean mongoClient(){
        MongoClientFactoryBean mongo = new MongoClientFactoryBean();
        ConnectionString connectionString = new ConnectionString("mongodb://test:test@mongo:27017/InstantConnect?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
        mongo.setConnectionString(connectionString);
        return mongo;


    }


}
