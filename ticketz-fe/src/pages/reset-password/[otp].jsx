/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import branding from "assets/icons/tickitzyn.svg";
import brandingFill from "assets/icons/Tickitzyn2.svg";
import { resetPwd } from "utils/https/auth";
import swal from "sweetalert";
import Loader from "components/Loader";
import Title from "utils/wrapper/title";
import publicRoute from "utils/wrapper/publicRoute";

function Otp() {
  const [iconEye, setIconEye] = useState(false);
  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  const [iconEye2, setIconEye2] = useState(false);
  const toggleIcon2 = () => {
    iconEye2 ? setIconEye2(false) : setIconEye2(true);
  };
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const otp = router.query.otp;
  const onChangeNewPwd = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeConfirmPwd = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPwd = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (newPassword.length < 4 || confirmPassword.length < 4) {
      setIsLoading(false);
      swal("Failed", "Password of at least 4 characters!", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      swal("Failed", "Passwords doesn't match!", "error");
      setIsLoading(false);
      return;
    }
    resetPwd(otp, newPassword, confirmPassword, controller)
      .then((res) => {
        setIsLoading(true);
        console.log(res);
        swal("Success", "Reset Password Success", "success");
        return router.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        return swal("Failed", err.response.data.msg, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Title title="Reset Password">
        {isLoading ? <Loader /> : <></>}
        <main className=" flex w-full h-full ">
          <section className="hero-auth hidden lg:flex w-[58%] flex-col ">
            <section className=" flex flex-col w-full h-full bg-tickitz-primary  px-28 bg-opacity-80">
              <div className=" pt-20  mb-[4rem] ">
                <Image src={branding} width={276} height={104} alt="brand" />
              </div>
              <div className=" flex flex-col gap-5">
                <p className=" text-white font-bold text-5xl lg:text-[1.8rem] xl:text-5xl leading-[60px]">
                  Lets reset your password
                </p>
                <p className=" text-white opacity-70 text-sm xl:text-2xl  xl:leading-[40px]">
                  To be able to use your account again, please <br /> complete
                  the following steps.
                </p>
              </div>
              <div className=" flex flex-col mt-[2rem] mb-[17.5rem] ">
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-white rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-tickitz-label font-bold">
                            1
                          </p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Fill your complete email</p>
                        </div>
                      </div>

                      <div className=" w-12 h-12 justify-center border-l-2 flex border-white ml-[1.438rem] "></div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-white rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-tickitz-label font-bold">
                            2
                          </p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Activate your account</p>
                        </div>
                      </div>

                      <div className=" w-12 h-12 justify-center border-l-2 flex border-white ml-[1.438rem] "></div>
                    </div>
                  </div>
                </div>

                <div className="category-course">
        {showAlert ?  (
        <div className="alert">
          Thêm vào giỏ hàng thành công!
        </div>
      ):(
        <div></div>
      )}
        {modal && selectedCourse && (
          <div className="modal">
            <div onClick={() => toggleModal(null)} className="overlay"></div>
            <div className="modal-content">
              <div className="name-modal"><a>{selectedCourse.name}</a></div>
              <div className="scroll-modal">
                <div className="img-price">
                  <img src={selectedCourse.image} alt={`Image of ${selectedCourse.name}`} />
                  <div className="price">
                    <div >
                      <FontAwesomeIcon icon={faTag} className="tag"/>
                      <span>{selectedCourse.price} VND</span>
                    </div>
                    <p>Số bài học: {selectedCourse.numLessons}</p>
                    <p>Ngôn ngữ: {selectedCourse.language}</p>
                  </div>
                </div>
                <div className="more-des">
                  <h1>{selectedCourse.h1des}</h1>
                  <ul>
                    {sections.map((section, index) => (
                      <li key={index}>{section}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-button">
              {addToCartSuccess[selectedCourse.id] ?(
                  <div className="add-cart" >
                    <a href="/cart" ><button>XEM GIỎ HÀNG</button></a>
                  </div>
              ) : (
                <div className="add-cart">
                  <button id="add" onClick={addToCart}>THÊM VÀO GIỎ HÀNG</button>
                </div>
              )}
                <div className="buy-now">
                  <button>MUA NGAY</button>
                </div>
              </div>
              <button className="close-modal" onClick={() => toggleModal(null)}>X</button>
            </div>
          </div>
        )}

        
        <div className="header-category">
            <div className="nameSchool">
                <img src="https://onthisinhvien.com/images/icon/otsv/icon-tag-school.svg">
                </img>
                <div>Đại học Kinh tế Quốc dân</div>
            </div>
            <div className="search-course">
                <button>HOT COMBO</button>
                <input placeholder="Tìm kiếm khóa học"></input>
            </div>
        </div>

    <div className="combo-course">
      <div className="block-category">
        <span className="name-cate">
          MÔN ĐẠI CƯƠNG (87 KHOÁ)
        </span>
        <div className="grid-cate">
          {courses.map((course) => (
            <div className="box-course" key={course.id}>
              <div className="box-img">
                <img src={course.image} alt={`Image of ${course.name}`} />
                <div class="overlay">
                  <div class="button-container">
                    <button class="button1" onClick={() => toggleModal(course)}>Xem nhanh</button>
                    <button class="button2">Mua Ngay</button>
                  </div>
                </div>
              </div>
              <div className="name-course">
                {course.name}
              </div>
              <div className="description-course">
                {course.description}
              </div>
              <div className="course-footer">
                <div className="number-member">
                  <span>{course.reviews} đánh giá</span>
                </div>
                <div className="course-price">
                  <button>{course.price} VND</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="category-showmore">
          <div className="cate-showmore">
            <button>Xem thêm</button>
          </div>
        </div>
      </div>
    </div>

    <div className="combo-course">
      <div className="block-category">
        <span className="name-cate">
          MÔN CHUYÊN NGÀNH (87 KHOÁ)
        </span>
        <div className="grid-cate">
          {courses.map((course) => (
            <div className="box-course" key={course.id}>
              <div className="box-img">
                <img src={course.image} alt={`Image of ${course.name}`} />
                <div class="overlay">
                  <div class="button-container">
                    <button class="button1" onClick={toggleModal}>Xem nhanh</button>
                    <button class="button2">Mua Ngay</button>
                  </div>
                </div>
              </div>
              <div className="name-course">
                {course.name}
              </div>
              <div className="description-course">
                {course.description}
              </div>
              <div className="course-footer">
                <div className="number-member">
                  <span>{course.reviews} đánh giá</span>
                </div>
                <div className="course-price">
                  <button>{course.price}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="category-showmore">
          <div className="cate-showmore">
            <button>Xem thêm</button>
          </div>
        </div>
      </div>
    </div>

                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-white rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-tickitz-label font-bold">
                            3
                          </p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Enter new password</p>
                        </div>
                      </div>

                      <div className=" w-12 h-12 justify-center border-l-2 flex border-white ml-[1.438rem] "></div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col">
                  <div className=" flex">
                    <div className="flex flex-col justify-center">
                      <div className=" flex gap-12">
                        <div className="bg-transparent border-white border-2 rounded-full w-12 h-12 justify-center items-center flex text-xl ">
                          <p className=" text-center text-white font-bold">4</p>
                        </div>
                        <div className=" text-white font-medium xl:text-2xl flex items-center lg:text-base">
                          <p>Done</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className=" flex w-full lg:w-[47%] xl:w-[42%]  flex-col ">
            <div className=" flex lg:hidden px-[10%] mt-[5rem] mb-[4.2rem] lg:inset-0">
              <Image src={brandingFill} width={200} alt="brandd" />
            </div>
            <form
              action=""
              className=" w-full  flex flex-col px-[10%]"
              onSubmit={handleResetPwd}
            >
              <h1 className=" text-[1.7rem] font-semibold lg:mt-[9.5rem] flex text-tickitz-basic">
                Reset Password
              </h1>
              <p className=" text-lg opacity-70 text-tickitz-label mt-4 flex">
                Make sure to enter your password securely
              </p>
              <div className=" flex flex-col gap-7 mt-12">
                <div className=" flex flex-col justify-center relative">
                  <label
                    htmlFor="newPassword"
                    className=" mb-3 text-base text-tickitz-basic"
                  >
                    New Password
                  </label>
                  <input
                    name="newPassword"
                    onChange={onChangeNewPwd}
                    value={newPassword}
                    type={`${iconEye ? "text" : "password"}`}
                    className=" h-16 rounded-md border border-tickitz-label flex w-full p-5  "
                    placeholder="Input New Password"
                  />
                  <i
                    className={` text-[#A9A9A9] absolute text-2xl cursor-pointer top-[50%] right-[1.5rem]  ${
                      iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon}
                  ></i>
                </div>
                <div className=" flex flex-col justify-center relative">
                  <label
                    htmlFor="confirmPassword"
                    className=" mb-3 text-base text-tickitz-basic"
                  >
                    Confirm New Password
                  </label>
                  <input
                    name="confirmPassword"
                    onChange={onChangeConfirmPwd}
                    value={confirmPassword}
                    type={`${iconEye2 ? "text" : "password"}`}
                    className=" h-16 rounded-md border border-tickitz-label flex w-full p-5  "
                    placeholder="Input New Password"
                  />
                  <i
                    className={` text-[#A9A9A9] absolute text-2xl cursor-pointer top-[50%] right-[1.5rem]  ${
                      iconEye2 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon2}
                  ></i>
                </div>

                <div className=" w-full mt-3">
                  <button
                    type="submit"
                    className="w-full h-16 btn bg-tickitz-primary hover:bg-tickitz-primary rounded-md text-white font-bold"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </Title>
    </>
  );
}

export default publicRoute(Otp);
