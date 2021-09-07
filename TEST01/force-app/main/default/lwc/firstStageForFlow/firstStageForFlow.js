import { LightningElement, wire, api } from 'lwc';
import getAvailableProperties from '@salesforce/apex/firstStageController.getAvailableProperties';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContact from '@salesforce/apex/firstStageController.getContact';
import PROPERTYVISIT_OBJECT from '@salesforce/schema/Property_Visit__c';
import CLIENT_FIELD from '@salesforce/schema/Property_Visit__c.Client__c';
import DATE_FIELD from '@salesforce/schema/Property_Visit__c.Date__c';
import PROP_FIELD from '@salesforce/schema/Property_Visit__c.Property__c';

const columns = [
    { label: 'Property Name', fieldName: 'Name' },
    { label: 'Property price', fieldName: 'Price__c', type: 'currency' },
    { label: 'City', fieldName: 'City__c' }
];

export default class FirstStageForFlow extends LightningElement {

    @api selectedRows=[];

    columns=columns;

    @wire(getAvailableProperties)
    props;

    getSelectedName(event) {
        this.selectedRows = event.detail.selectedRows;
            for(let i = 0; i < this.selectedRows.length; i++) {
                
                this.selectedRows = event.detail.selectedRows;
                console.log("you selected " + this.selectedRows[i].Name);
            }
    }
}