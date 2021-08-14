export const normalizeCertificates = (certificates) => {
  return certificates.map(
    ({
      ID,
      TABLENAME,
      PRIMARYKEY,
      NAME,
      DESCRIPTION,
      PRICE,
      SUMMA,
      DISCOUNT,
    }) => ({
      Id: ID,
      TableName: TABLENAME,
      PrimaryKey: PRIMARYKEY,
      Name: NAME,
      Description: DESCRIPTION,
      Price: PRICE,
      Summa: SUMMA,
      Discount: DISCOUNT,
    }),
  )
}
