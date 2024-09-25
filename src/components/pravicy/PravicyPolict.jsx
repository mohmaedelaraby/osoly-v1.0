import React from "react";
import PageHeader from "../shared/PageHeader";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "@chakra-ui/react";

function PravicyPolicy() {
  const { t } = useTranslation();
  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("sidebar.settings")}></PageHeader>
          </div>

          <div className="page_container_table">
            <>
              <Card className="from__card" width="100%">
                <CardBody>
                  <div>
                    <h1 className="mb-8">مقدمة</h1>
                    <p className="mb-24">
                      تلتزم اصولي بحماية خصوصية مستخدمي تطبيق "أصولي". هذه
                      السياسة تحدد كيفية جمعنا واستخدامنا وكشفنا عن المعلومات
                      التي نحصل عليها منك عند استخدامك للتطبيق.
                    </p>

                    <h2 className="mb-8">البيانات التي نجمعها</h2>
                    <p className="mb-8">
                      نحن نجمع الحد الأدنى من البيانات اللازمة لتقديم خدماتنا،
                      بما في ذلك:
                    </p>
                    <ul>
                      <li>اسم المستخدم</li>
                      <li>عنوان البريد الإلكتروني</li>
                      <li>رقم التليفون</li>
                    </ul>

                    <h2 className="mb-8">كيفية استخدامنا للبيانات</h2>
                    <p className="mb-24">
                      <strong>تقديم الخدمات:</strong> نستخدم بياناتك لتوفير
                      خدمات إدارة العقارات، وتتبع المدفوعات، وتقديم الدعم الفني.
                    </p>
                    <p className="mb-24">
                      <strong>تحسين الخدمات:</strong> قد نستخدم بياناتك لتحليل
                      استخدام التطبيق وتحسين تجربتك.
                    </p>

                    <h2 className="mb-8">المشاركة مع شركات تحليل</h2>
                    <p className="mb-24">
                      قد نشارك بيانات مجهولة المصدر مع شركات تحليل ثالثة لتحسين
                      أداء التطبيق.
                    </p>

                    <h2 className="mb-8">مشاركة البيانات</h2>
                    <p className="mb-8">قد نشارك بياناتك مع:</p>
                    <ul>
                      <li>
                        <strong>شركات تحليل ثالثة:</strong> لمساعدتنا في تحسين
                        خدماتنا.
                      </li>
                      <li>
                        <strong>مقدمي الخدمات:</strong> مثل شركات الاستضافة،
                        لتوفير البنية التحتية للتطبيق.
                      </li>
                    </ul>

                    <h2 className="mb-8">أمن البيانات</h2>
                    <p className="mb-24">
                      نحن نلتزم بحماية بياناتك ونطبق إجراءات أمنية مناسبة، بما
                      في ذلك:
                    </p>
                    <p className="mb-24">
                      <strong>حماية من البايوهاك:</strong> لحماية بياناتك من
                      الوصول غير المصرح به.
                    </p>

                    <h2 className="mb-8">حقوق المستخدم</h2>
                    <p className="mb-24">
                      <strong>الوصول إلى البيانات:</strong> يمكنك طلب الاطلاع
                      على البيانات التي نحتفظ بها عنك.
                    </p>
                    <p className="mb-24">
                      <strong>تصحيح البيانات:</strong> يمكنك طلب تصحيح أي بيانات
                      غير صحيحة.
                    </p>
                    <p className="mb-24">
                      <strong>حذف الحساب:</strong> يمكنك طلب حذف حسابك.
                    </p>

                    <h2 className="mb-8">التغييرات على هذه السياسة</h2>
                    <p className="mb-24">
                      نحتفظ بالحق في تعديل هذه السياسة من وقت لآخر.
                    </p>

                    <h2 className="mb-8">اتصل بنا</h2>
                    <p className="mb-24">
                      إذا كان لديك أي أسئلة حول هذه السياسة، يرجى الاتصال بنا
                      على
                      <a href="mailto:com.usooly@Superadmin">
                        com.usooly@Superadmin
                      </a>
                      .
                    </p>
                  </div>

                  <div dir="ltr">
                    <h1 className="mb-8">Introduction</h1>
                    <p className="mb-24">
                      Asooli is committed to protecting the privacy of its
                      users. This policy outlines how we collect, use, and
                      disclose information obtained from you when you use the
                      application.
                    </p>

                    <h2 className="mb-8">Data We Collect</h2>
                    <p className="mb-8">
                      We collect the minimum amount of data necessary to provide
                      our services, including:
                    </p>
                    <ul>
                      <li>Username</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                    </ul>

                    <h2 className="mb-8">How We Use Your Data</h2>
                    <p className="mb-24">
                      <strong>Providing Services:</strong> We use your data to
                      provide property management services, track payments, and
                      offer technical support.
                    </p>
                    <p className="mb-24">
                      <strong>Improving Services:</strong> We may use your data
                      to analyze application usage and enhance your experience.
                    </p>

                    <h2 className="mb-8">Sharing with Analytics Companies</h2>
                    <p className="mb-24">
                      We may share anonymized data with third-party analytics
                      companies to improve the application's performance.
                    </p>

                    <h2 className="mb-8">Data Sharing</h2>
                    <p className="mb-8">We may share your data with:</p>
                    <ul>
                      <li>
                        <strong>Third-party analytics companies:</strong> To
                        help us improve our services.
                      </li>
                      <li>
                        <strong>Service providers:</strong> Such as hosting
                        companies, to provide the application's infrastructure.
                      </li>
                    </ul>

                    <h2 className="mb-8">Data Security</h2>
                    <p className="mb-24">
                      We are committed to protecting your data and implement
                      appropriate security measures, including:
                    </p>
                    <p className="mb-24">
                      <strong>Protection against data breaches:</strong> To
                      safeguard your data from unauthorized access.
                    </p>

                    <h2 className="mb-8">User Rights</h2>
                    <p className="mb-24">
                      <strong>Access to Data:</strong> You can request to view
                      the data we hold about you.
                    </p>
                    <p className="mb-24">
                      <strong>Correction of Data:</strong> You can request the
                      correction of any inaccurate data.
                    </p>
                    <p className="mb-24">
                      <strong>Account Deletion:</strong> You can request the
                      deletion of your account.
                    </p>

                    <h2 className="mb-8">Changes to This Policy</h2>
                    <p className="mb-24">
                      We reserve the right to modify this policy from time to
                      time.
                    </p>

                    <h2 className="mb-8">Contact Us</h2>
                    <p className="mb-24">
                      If you have any questions regarding this policy, please
                      contact us at
                      <a href="mailto:com.usooly@Superadmin">
                        com.usooly@Superadmin
                      </a>
                      .
                    </p>
                  </div>
                </CardBody>
              </Card>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default PravicyPolicy;
