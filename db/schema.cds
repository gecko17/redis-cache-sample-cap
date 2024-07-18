namespace redis.cache.sample;

@cds.persistence.skip
entity Sample
{
    key ID : String(10);
    Name : String(100);
}
