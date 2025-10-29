import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, Filter, ObjectId, SortDirection, UpdateFilter, WithId, } from 'mongodb';
import { CollectionNames } from 'src/util/constant';
@Injectable()
export class MongoService {
    constructor(
        @Inject("mongoinstance") private readonly db: Db
    ) { }



    async insert<T>(collectionName: CollectionNames, data: T) {
        data["createdAt"] = new Date();
        data["updatedAt"] = new Date();
        data["isDeleted"] = false;
        const response = await this.db.collection(collectionName).insertOne(data);
        data["_id"] = response.insertedId;
        return data; 
    }



  async findByQuery<T>(collectionName: CollectionNames, query: any): Promise<WithId<T>[]> {
    const collection = this.db.collection<T>(collectionName);
    return collection.find(query).toArray();
  }
 



     async findById<T>(
    collectionName: CollectionNames,
    id: string,
  ): Promise<WithId<T> | null> {
    const collection = this.db.collection<T>(collectionName);
    const filter: Filter<T> = { _id: new ObjectId(id) } as unknown as Filter<T>;
    return collection.findOne(filter);
  }


  async updateById<T>(
    collectionName: CollectionNames,
    id: string,
    updateData: Partial<T>,
  ): Promise<WithId<T> | null> {
    const collection = this.db.collection<T>(collectionName);

    updateData['updatedAt'] = new Date();

    const filter: Filter<T> = { _id: new ObjectId(id) } as unknown as Filter<T>;

    const result:any = await collection.findOneAndUpdate(
      filter,
      { $set: updateData } as UpdateFilter<T>,
      { returnDocument: 'after' },
    );

    return result.value;
  }

  async findWithQuerySortAndPagination<T>(
    collectionName: CollectionNames,
    query: any,
    sortField: string,
    sortType: any,
    page: number,
    count: number,
  ): Promise<{ data: WithId<T>[]; totalCount: number }> {
    const sortDirection = sortType;
    const sortObj: any = {};

    if (sortField) {
      sortObj[sortField] = sortDirection;
    }

    const collection: Collection<any> = this.db.collection<any>(collectionName);

    const totalCount = await collection.countDocuments(query);

    const skipCount = (page - 1) * count;
    const response = await collection
      .find(query)
      .sort(sortObj)
      .skip(skipCount)
      // .skip(skipCount < totalCount ? skipCount : 0)
      .limit(count)
      .toArray();

    return {
      data: response,
      totalCount,
    };
  }

  async countByQuery(
    collectionName: CollectionNames,
    query: any,
  ): Promise<number> {
    try {
      const count = await this.db
        .collection(collectionName)
        .countDocuments(query);
      return count;
    } catch (error) {
      console.error('Error while counting documents:', error);
      throw error;
    }
  }

   async deleteById(
    collectionName: CollectionNames,
    id: string,
  ): Promise<{ deletedCount: number }> {
    const collection = this.db.collection(collectionName);
    const filter: Filter<any> = { _id: new ObjectId(id) } as unknown as Filter<any>;
    const result = await collection.deleteOne(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }


}
