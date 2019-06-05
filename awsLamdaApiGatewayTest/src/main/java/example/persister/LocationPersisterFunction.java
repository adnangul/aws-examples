package example.persister;

import java.util.UUID;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

/**
 * ref: 
 * http://jcraane.blogspot.com/2016/12/aws-lambdajava-dynamodb-and-api-gateway.html
 * https://github.com/jcraane/LambdaDynamoDBApiGateway
 * @author adnan.yaqoob
 *
 */
public class LocationPersisterFunction implements RequestHandler<DeviceLocation, Void> {
    @Override
    public Void handleRequest(final DeviceLocation input, final Context context) {
    	
    	final AmazonDynamoDBClient client = 
    			new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider())
    				.withRegion(Regions.US_EAST_2); // specify the region you created the table in.
        final DynamoDB dynamoDB = new DynamoDB(client);

//        static AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion(Regions.US_EAST_2) ;
//        static DynamoDB dynamoDB = new DynamoDB(client);
        
        //final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient().setRegion(Regions.US_EAST_2);
        
        System.out.println("input = " + input); // Pure for testing. Do not use System.out in production code
        final Table table = dynamoDB.getTable("DeviceLocation");
        final Item item = new Item()
                .withPrimaryKey("id", UUID.randomUUID().toString()) // Every item gets a unique id
                .withString("deviceId", input.getDeviceId())
                .withDouble("lat", input.getLat())
                .withDouble("lng", input.getLng());

        table.putItem(item);
        return null;
	}

}
