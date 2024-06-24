import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardDto } from './card.dto';
import { Card, CardDocument } from './card.schema';
import { CustomException } from '../common/common.params';
import { CustomHttpStatus } from '../common/httpStatus.enum';

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<Card>) {}

  /**
   * Create a new card
   * @body cardDto Card data
   * @returns Card
   * @throws Error if card already exists or if there is an error creating the card
   * @param cardDto
   */

  async createCard(cardDto: CardDto): Promise<Card | Error> {
    const existingCard = await this.cardModel.findOne({ name: cardDto.name });
    if (existingCard) {
      throw new CustomException(
        'Card already exists',
        CustomHttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.cardModel.create(cardDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Find a card by name
   * @param name Card name
   * @returns Card
   * @throws Error if card does not exist
   * @param name
   * @returns Promise<Card> | Promise<Error>
   */
  async findCardByName(name: string): Promise<CardDocument> {
    const card = await this.cardModel.findOne({ name });
    if (!card) {
      throw new CustomException('Card not found', CustomHttpStatus.NOT_FOUND);
    }
    return card;
  }

  /**
   * Find all cards
   * @returns Card[]
   */
  async findAllCards(): Promise<CardDocument[]> {
    return await this.cardModel.find();
  }

  /**
   * Update a card
   * @param name Card name
   * @param cardDto Card data
   * @returns Card
   * @throws Error if card does not exist or if there is an error updating the card
   * @param name
   * @param cardDto
   * @returns Promise<Card> | Promise<Error>
   */
  async updateCard(name: string, cardDto: CardDto): Promise<CardDocument> {
    const card = await this.cardModel.findOne({ name });
    if (!card) {
      throw new CustomException('Card not found', CustomHttpStatus.NOT_FOUND);
    }
    try {
      return await this.cardModel.findOneAndUpdate({ name }, cardDto, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a card
   * @param name Card name
   * @returns Card
   * @throws Error if card does not exist or if there is an error deleting the card
   * @param name
   * @returns Promise<Card> | Promise<Error>
   */
  async deleteCard(name: string): Promise<CardDocument> {
    try {
      return await this.cardModel.findOneAndDelete({ name: name });
    } catch (err) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
