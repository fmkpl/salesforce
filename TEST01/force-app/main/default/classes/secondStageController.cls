public with sharing class secondStageController {
    public secondStageController() {
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperties(Integer priceKey) {
        return [select Id,
         City__c,
           Name,
            Price__c from Property__c where Status__c='Available' and Price__c>=:priceKey];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(String clientNameKey) {
        String key = '%' + clientNameKey + '%';
        return [select Id from Contact where Name like :key];
    }

    @AuraEnabled(cacheable=true)
    public static Proposal__c createProposalObj(String clientNameKey, String partnerAgentNameKey, String propertyNameKey){
        
            Proposal__c newProposal = new Proposal__c();

            newProposal.Client__c = clientNameKey;
            newProposal.Partner_Agent__c = partnerAgentNameKey;
            newProposal.Property__c = propertyNameKey;

            insert newProposal;  

            return newProposal;
            //System.debug(newProposal.Name);
    }
}
