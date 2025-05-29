import styles from './layout.module.scss'
import Image from "next/image";
import Link from "next/link";
import moment from "moment/moment";

const Footer = async () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="block-pays">
          <Image
            src="/images/fitassist-gray.png"
            alt="logo"
            width={129}
            height={25}
          />
          <Link href="/privacy-policy" className="policy privacy">Политика конфиденциальности</Link>
          <div className="items hidden-md">
            <p>Белкард</p>
            <p>МИР</p>
            <p>VISA</p>
            <p>Mastercard</p>
            <Image
              src="/images/apple-pay.png"
              alt="apple-pay"
              width={34}
              height={13}
            />
          </div>
        </div>
        <div className="offerta-block">
          <Link href="https://api.baseapp.pro/file-storage/static/fitness_app%2Ftrainer_offerta.pdf" className="policy privacy">Договор оферты тренера</Link>
        </div>
        <div className="policy-block">
          <p className="copyright">© {moment().format('YYYY')} Fit Assist</p>
          <Link
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            className="agreement privacy"
          >
            Пользовательское соглашение
          </Link>
          <p className="hidden-md">В приложении имеются платные подписки.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
