import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  businessAccounts,
  businessAccountsDocument,
} from '../schemas/business-accounts.schema';

@Injectable()
export class BusinessAccountRepository {
  constructor(
    @InjectModel(businessAccounts.name)
    private BusinessAccountModel: Model<businessAccountsDocument>,
  ) {}


  // To do
  async saveBusinessAccount(platform: string, payload: any) {
    const BusinessAccount = new this.BusinessAccountModel({
      platform,
      payload,
    });
    return await BusinessAccount.save();
  }

  async getBusinessAccountsByIdentifier(messager_identifier: string) {
    console.log(messager_identifier)
    return await this.BusinessAccountModel.findOne({ messager_identifier: messager_identifier });
  }
}