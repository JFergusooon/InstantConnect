package ferguson.jeffrey.userservice;


import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

}
