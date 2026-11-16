"use strict";
// Luận giải quy tắc, tham khảo cấu trúc từ tài liệu người dùng cung cấp.
// Đây không phải dự báo chắc chắn hoặc hệ thống Mai Hoa Dịch Số đầy đủ.
(function(root){
  const NATURE={
    1:"Cương kiện, chủ động và bền bỉ",2:"Nhu thuận, tích lũy và nâng đỡ",
    3:"Khởi đầu nhiều khó khăn, cần kiên nhẫn",5:"Chờ đợi đúng thời điểm",
    11:"Thông thuận, giao hòa",12:"Bế tắc, cần xét lại đường tiến",
    14:"Phong phú, có nguồn lực",15:"Khiêm nhường, biết tiết chế",
    29:"Gặp hiểm, cần thận trọng",30:"Sáng rõ nhưng cần giữ sự ổn định",
    31:"Cảm ứng, cần chân thành",47:"Bị hạn chế, cần giữ vững",
    54:"Quan hệ chưa cân xứng, cần cân nhắc",63:"Việc thành nhưng phải giữ gìn",
    64:"Việc chưa hoàn tất, cần chuẩn bị thêm"
  };
  const GOOD=new Set([1,11,14,15,19,24,41,42,43,44,45,46,50,55,56,57,58,59,60,61,62,63]);
  const BAD=new Set([12,20,23,29,36,39,47,48,54,64]);
  function nature(h){return NATURE[h.id]||"Cần suy xét quẻ từ và từng hào trước khi hành động"}
  function verdict(a,b){
    let score=[a,b].filter(Boolean).reduce((n,h)=>n+(GOOD.has(h.id)?1:BAD.has(h.id)?-1:0),0);
    if(score>=2)return "ĐẠI CÁT — Thiên về thuận lợi; vẫn cần ứng xử đúng mực.";
    if(score===1)return "TIỂU CÁT — Có tín hiệu thuận, nên chuẩn bị chu đáo.";
    if(score===0)return "BÌNH — Chưa thể kết luận tốt xấu; chú trọng hành động thực tế.";
    if(score===-1)return "TIỂU HUNG — Có trở ngại, nên thận trọng và điều chỉnh.";
    return "ĐẠI HUNG — Nhiều điều cần dè chừng; không nên quyết định nóng vội.";
  }
  function advice(a,question){
    const q=String(question||"").toLocaleLowerCase("vi");
    if(/tình cảm|tình yêu|hôn nhân|người yêu/.test(q))return "Về tình cảm, nên đối thoại chân thành, tôn trọng người liên quan và không suy diễn ý định người khác chỉ từ quẻ.";
    if(/công việc|sự nghiệp|làm ăn|kinh doanh|đầu tư/.test(q))return a.id===5?"Quẻ Nhu nhấn mạnh thời điểm chín muồi; hãy đánh giá nguồn lực, kế hoạch và rủi ro trước khi tiến.":"Về công việc, dùng quẻ từ để tự rà soát thời cơ, nguồn lực và trở ngại; dựa vào dữ kiện thực tế khi quyết định.";
    if(/sức khỏe|bệnh|thuốc/.test(q))return "Về sức khỏe, quẻ chỉ dùng để suy ngẫm; nên tham khảo chuyên môn y tế thay vì quyết định điều trị theo quẻ.";
    return "Đối chiếu quẻ từ với hoàn cảnh thực tế, lắng nghe các bên liên quan và chọn bước đi có thể kiểm chứng.";
  }
  function movingNote(i,line){
    if(i===4)return "Hào 5 thường được liên hệ với vị trí chủ đạo, trách nhiệm và quyết định lớn; cần xem nguyên văn trong bối cảnh.";
    if(i===1)return "Hào 2 thường liên hệ vai trò ở trung vị, sự phối hợp và thực hiện; cần xem nguyên văn trong bối cảnh.";
    if(/潛龍勿用/.test(line))return "Tiềm long vật dụng: chưa đến lúc hành động lớn; nên tích lũy và chuẩn bị.";
    if(/飛龍在天/.test(line))return "Phi long tại thiên: hình tượng thời cơ phát huy năng lực; vẫn cần giữ sự tỉnh táo.";
    return "Hào động cho biết điểm chuyển trong tượng quẻ; hãy đọc nguyên văn để suy ngẫm về tình huống hiện tại.";
  }
  function generateJudgment(a,b,indices,question){
    if(!a||!Array.isArray(indices))throw Error("Thiếu dữ liệu luận quẻ");
    const hasChange=indices.length>0;
    return {
      body:"Quẻ chính "+a.hanViet+": "+nature(a)+". Tượng trưng cho tình hình đang xét.",
      application:hasChange?"Quẻ biến "+b.hanViet+": "+nature(b)+". Đây là chiều hướng biểu tượng khi các hào động đổi âm dương.":"Quẻ tĩnh: không có hào động; đọc quẻ chính làm trọng tâm, không tự suy ra kết cục cố định.",
      lines:indices.map(i=>({position:i+1,text:a.lines[i]||"",note:movingNote(i,a.lines[i]||"")})),
      advice:advice(a,question),
      verdict:verdict(a,hasChange?b:null),
      disclaimer:"Luận giải tự động dựa trên các quy tắc giản lược trong tài liệu, không phải dự đoán tương lai hay hệ thống Ngũ hành/Thể–Dụng chuyên sâu."
    };
  }
  root.generateJudgment=generateJudgment;
})(typeof window!=="undefined"?window:globalThis);
