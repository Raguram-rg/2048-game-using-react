import styles from './Scores.module.css'

const Scores = ({scores,best}) => {
    return(
        <>
          <div className={styles.scoreboard}>
             <span style={{color:'#484848'}}>Score</span> 
             <div style={{fontSize:21,fontWeight:700}}>
              {scores}
             </div>
          </div>
          <div className={styles.scoreboard}>
            <span style={{color:'#484848'}}>Best</span> 
            <div style={{fontSize:21,fontWeight:700}}>
              {best}
            </div>
        </div>
      </>
    );
}

export default Scores;