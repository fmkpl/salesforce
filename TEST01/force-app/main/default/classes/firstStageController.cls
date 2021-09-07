public with sharing class firstStageController {
    public firstStageController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getAvailableProperties() {
        return [select Id,
         City__c,
           Name,
            Price__c from Property__c where Status__c='Available'];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(String clientNameKey) {
        String key = '%' + clientNameKey + '%';
        return [select Id from Contact where Name like :key];
    }
}
