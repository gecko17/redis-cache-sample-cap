using { redis.cache.sample as my } from '../db/schema.cds';

@path : '/service/SampleService'
service SampleService
{
    entity Sample as
        projection on my.Sample;
}

annotate SampleService with @requires :
[
    'authenticated-user'
];
