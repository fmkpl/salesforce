import { LightningElement, api, wire, track } from 'lwc';
import getProperties from '@salesforce/apex/secondStageController.getProperties';
import getContact from '@salesforce/apex/secondStageController.getContact';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PROPOSAL_OBJECT from '@salesforce/schema/Proposal__c';
import CLIENT_FIELD from '@salesforce/schema/Proposal__c.Client__c';
import PARTAG_FIELD from '@salesforce/schema/Proposal__c.Partner_Agent__c';
import PROP_FIELD from '@salesforce/schema/Proposal__c.Property__c';


const columns = [
    { label: 'Property Name', fieldName: 'Name' },
    { label: 'Property price', fieldName: 'Price__c', type: 'currency' },
    { label: 'City', fieldName: 'City__c' }
];


export default class SecondStage extends LightningElement {
    columns=columns;

    priceKey=0;

    clientNameKey='';
    partnerAgentNameKey='';
    propertyNameKey='';

    proposalId;

    @track errors;


    createProposal() {
            const fields = {};
            fields[CLIENT_FIELD.fieldApiName] = this.contactClient.data[0].Id;
            fields[PARTAG_FIELD.fieldApiName] = this.contactPartnerAgent.data[0].Id;
            fields[PROP_FIELD.fieldApiName] = this.propertyNameKey;
            const recordInput = { apiName: PROPOSAL_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(proposal => {
                    this.proposalId = proposal.id;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Proposal created',
                            variant: 'success',
                        }),
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                });
        
        
    }


    handlePriceKeyChange(event) {
        this.priceKey = event.target.value;
    }
    handleClientNameChange(event) {
        this.clientNameKey = event.target.value;
    }
    handlePartnerAgentNameChange(event) {
        this.partnerAgentNameKey = event.target.value;
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        if(selectedRows.length>1) {
            alert("*you selected more than 1 property*");
        } 
        else {
            for(let i = 0; i < selectedRows.length; i++) {
                this.propertyNameKey = selectedRows[i].Id.toString();
                alert("you selected " + selectedRows[i].Name);
            }
        }
    }

    /*createProposallll() {
        createProposalObj({clientNameKey: "$clientNameKey", 
        partnerAgentNameKey: "$partnerAgentNameKey",
     propertyNameKey: "$propertyNameKey"});
        alert("Propoasal created!"+ typeof(this.propertyNameKey)+" "+typeof(this.clientNameKey)+" "+typeof(this.partnerAgentNameKey));
    }*/



    
    /*handleLoadddddd() {
        getProperties({priceKey: this.priceKey})
            .then(result => {
                this.props = result;
            })
            .catch(error => {
                this.error = error;
            });
    }*/
    
    @wire(getProperties, {priceKey: "$priceKey"})
    props;

    @wire(getContact, {clientNameKey: '$clientNameKey'})
    contactClient;

    @wire(getContact, {clientNameKey: '$partnerAgentNameKey'})
    contactPartnerAgent;
}