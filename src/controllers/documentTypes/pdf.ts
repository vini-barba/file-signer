function Pdf(document: any) {
  console.log('[Pdf.ts]');

  function sign(email: string) {
    console.log('\t[Pdf.ts] - sign');
  }

  return {
    sign,
  };
}
export default Pdf;
