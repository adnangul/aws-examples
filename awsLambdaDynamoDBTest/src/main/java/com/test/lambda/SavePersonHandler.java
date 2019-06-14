package com.test.lambda;


import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

/**
 * 
 * @author adnan.yaqoob
 * ref: https://www.baeldung.com/aws-lambda-dynamodb-java
 *      the article has a lot of error or ambiguous directions but I followed based on best judgment
 *      create table, and then create function with pre-existent role (I gave dynamo full access)
 */
public class SavePersonHandler implements RequestHandler<PersonRequest, PersonResponse> {
   
  private DynamoDB dynamoDb;
  private String DYNAMODB_TABLE_NAME = "Person";
  private Regions REGION = Regions.US_EAST_2;

  
	public PersonResponse handleRequest(PersonRequest personRequest, Context context) {

		this.initDynamoDbClient();

		persistData(personRequest);

		PersonResponse personResponse = new PersonResponse();
		personResponse.setMessage("Saved Successfully!!!");
		return personResponse;
	}

  private PutItemOutcome persistData(PersonRequest personRequest) 
    throws ConditionalCheckFailedException {
		return this.dynamoDb.getTable(DYNAMODB_TABLE_NAME)
				.putItem(new PutItemSpec()
						.withItem(new Item()
							.withLong("id", personRequest.getId())
							.withString("firstName", personRequest.getFirstName())
							.withString("lastName", personRequest.getLastName())
							)
				);
  }

	@SuppressWarnings("deprecation")
	private void initDynamoDbClient() {
		AmazonDynamoDBClient client = new AmazonDynamoDBClient();
		client.setRegion(Region.getRegion(REGION));
		this.dynamoDb = new DynamoDB(client);
	}
}