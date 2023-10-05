-- Câu 3 (2điểm): Cho bảng thông tin của các dự án (DU_AN), các dự án này sẽ không bị chồng chéo lên nhau, tức là 1 mốc thời gian thì chỉ thực hiện một dự án. Bảng các dự án này sẽ bao gồm ID của công việc (id_cv), ngày bắt đầu (ngay_bd) và ngày kết thúc (ngay_kthuc). Mỗi một công việc chỉ được làm trong một ngày hay nói cách khác chênh lệch giữa ngay_bd va ngay_kthuc là 1 cho 1 ngày. Nếu ngày kết thúc nhiệm vụ liên tiếp thì chúng sẽ là một phẩn của cùng một dự án. Sử dụng SQL để viết truy vấn trả về ngày bắt đầu và ngày kết thúc của từng dự án và số ngày cần hoàn thành của dự án đó. Sắp xếp tăng dần theo số thời gian hoàn thành 1 dự án, nếu cùng thời gian thì sắp xếp tăng dần theo ngày bắt đầu.
-- Input
-- DU_AN
-- id_cv	ngay_bd	ngay_kthuc
-- 1	11-11-2022	11-12-2022
-- 2	11-12-2022	11-13-2022
-- 3	11-20-2022	11-21-2022
-- 4	11-21-2022	11-22-2022
-- 5	11-25-2022	11-26-2022
-- 6	11-28-2022	11-29-2022
-- 	Output

-- Ngay_bd	Ngay_kthuc	SL_ngay
-- 11-25-2022	11-26-2022	1
-- 11-28-2022	11-29-2022	1
-- 11-11-2022	11-13-2022	2
-- 11-20-2022	11-22-2022	2

-- Giải quyết: 
-- Ngay_bd là ngay_bd của hàng đang xét
-- Nếu ngay_kthuc của hàng đang xét là ngay_bd của hàng kế tiếp thì tiếp tục xét với hàng kế tiếp
-- Còn nếu không thì dừng lại và in ra SL_ngay là datediff giữa ngay_bd của hàng đầu tiên và ngay_kthuc của hàng đang xét

-- Sắp xếp theo thứ tự ngay_bd
with cte as (
    select id_cv, ngay_bd, ngay_kthuc, datediff(day, ngay_bd, ngay_kthuc) as SL_ngay
    from DU_AN
)
select ngay_bd, ngay_kthuc, SL_ngay
