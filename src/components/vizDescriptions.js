import { Text } from "@mantine/core";

const homeMargin = {
  margin: "20px 30px 5px 30px",
};

const margin = {
  margin: "30px 30px 20px 30px",
};

export function Home() {
  return (
    <div>
      <Text size="lg" align="justify" style={{margin: "5px 30px 20px 30px", width : 900}} >
        Cet outil de visualisation a pour but de démontrer les relations entre
        multiples facteurs entrant en compte durant la publication de contenu
        sur Instagram. Pour cela, nous avons analysé plus d'un million de
        publications d'influenceurs français. Nous avons donc tenté d’identifier
        le plus de corrélations et de relations entre les différentes catégories
        nommées, à la recherche de conclusions intéressantes et pertinentes pour
        les utilisateurs d’Instagram.
      </Text>

      <Text size="lg" align="justify" style={homeMargin}>
        Nous cherchons donc à répondre à cette question générale: quelles
        seraient les meilleures actions à prendre pour favoriser le taux
        d’engagement sur les publications d’un utilisateur francophone?
      </Text>

      <Text size="lg" align="justify" style={homeMargin}>
        L'onglet « Tendances » présente les tendances observées à partir de
        notre jeu de données.
      </Text>

      <Text size="lg" align="justify" style={homeMargin}>
        L'onglet « Temporel » démontre l'évolution du nombre de publication et
        de likes sur une période de temps.
      </Text>

      <Text size="lg" align="justify" style={homeMargin}>
        L'onglet « Taux d'engagement » établit les corrélations entre le taux
        d'engagement et d'autres facteurs.
      </Text>
    </div>
  );
}

export function StackedBarChartHashtag() {
  return (
    <div>
      <Text size="lg" style={margin} align="justify">
        Cette visualisation de données présente le nombre de likes et de
        commentaires des top 10 mots-dièse les plus utilisés afin d'observer
        leurs corrélations. Ici, nous tentons d'observer les corrélations entre
        les différents thèmes de taux d'engagement, soit le nombre d'utilisation
        des hashtags, le nombre de commentaire sur les publications qui les
        utilisent, ainsi que leur nombre de likes.
      </Text>
      <Text size="lg" style={margin} align="justify">
        Nous remarquons que l'usage d'un mot-dièse populaire ne garantit pas
        nécessairement un nombre élevé de J'aime et de commentaires. Par
        exemple, le hashtag « citation » est celui qui a été le plus utilisé
        dans les publications françaises en 2021. Celui-ci a amassé un nombre
        total de likes de 297215209 et 3052371 de commentaires. Malgré sa
        popularité, nous observons que le hashtag « humour », étant le troisième
        plus populaire, a un nombre total de likes 34263384 et 3572031 pour les
        commentaires. Il serait alors faux pour un utilisateur de penser
        qu'utiliser un mot-dièse populaire génère plus de traction. Il est
        possible de survoler sa souris sur chacun bande pour avoir le nombre de
        likes et de commentaires exact pour chaque hashtag.
      </Text>
    </div>
  );
}

export function LineChartMultiple() {
  return (
    <Text size="lg" style={margin} align="justify">
      Nous avons recensé les 12 hashtags des publications francophones les plus utilisés en 2021. En
      ordre descendant de nombre de publications, les voici: #citation, #amour,
      #humour, #citationdujour, #love, #france, #citations, #dz, #citationamour,
      #couple, #blague et #paris. On remarque certains thèmes récurrents: les
      citations étaient à la mode en 2021, car 4 des hashtags les plus
      populaires en contiennent! Ensuite, l'amour est en deuxième place dans le
      palmarès de popularité, suivi des thèmes humoristiques. Si vous voulez
      utiliser un de ces hashtags et que vous vous demandiez le moment de
      l'année le plus approprié pour l'apposer à votre publication, voici la
      visualisation pour le déterminer!
    </Text>
  );
}

export function LineChartByMonth() {
  return (
    <Text size="lg" style={margin} align="justify">
      Les publications ont été séparées selon les mois et la somme pour chaque
      mois a été effectuée. Ainsi, le nombre de publications totales par mois
      peut être affiché. Il est possible de remarquer une baisse de publications
      durant les mois d'avril, de mai et de juin ainsi qu'une remontée dans les
      prochains mois, surtout pendant les temps des fêtes. L'utilisateur peut
      donc avoir une idée globale de la répartition des publications tout au
      long de l'année 2021. Survoler sa souris sur chacun des sommets permet
      d'avoir le nombre de publications exact pour chaque mois.
    </Text>
  );
}

export function RadarChartByMonth() {
  return (
    <Text size="lg" style={margin} align="justify">
      Une autre question sur laquelle nous pouvons nous pencher est la suivante:
      Quelle est la fréquence des publications des comptes les plus populaires,
      c’est-à-dire ayant le plus d’abonnés? Pour ce faire, nous avons compilé
      les publications des 10 comptes Instagram ayant le plus d'abonnés pour
      afficher la moyenne par mois. En observant ce graphique, il est possible
      de voir un pic évident pour le mois de Juin. Encourager de poster durant
      ce mois est donc une bonne initiative pour un utilisateur cherchant à
      augmenter son taux de traction. Il est possible de survoler la souris au
      dessus de chaque pic pour obtenir des informations détaillées sur
      celui-ci.
    </Text>
  );
}

export function RadarChartByHour() {
  return (
    <Text size="lg" style={margin} align="justify">
      Finalement, y a-t-il un moment idéal de la journée pour publier? En
      faisant la moyenne des likes par heure de la journée, il semble que les
      publications faites entre 7AM et 6PM (en heure de l'Est) performent mieux,
      avec un pic à 5PM. Curieusement, ces heures correspondent à une journée
      régulière de travail... La marge de manoeuvre est donc assez grande pour
      maximiser sa performance, tant que vous ne publiez pas au milieu de la
      nuit ni en soirée!
    </Text>
  );
}

export function BarChart() {
  return (
    <Text size="lg" style={margin} align="justify">
      Quel type de publication choisir pour générer le plus de likes? Selon le
      diagramme ci-dessus, il semblerait que les albums (les compilations de
      photos et de vidéos) ont en moyenne plus de likes que les autres types de
      publications. Les gens sont plus enclins à laisser un like lorsqu'il y a
      plus de contenu à visionner à la fois. Les photos et les vidéos accumulent
      en moyenne des nombres similaires de likes. Les IGTV, quant à eux,
      accumulent le moins de likes, mais il faut prendre un autre paramètre en
      compte (indice: allez voir la prochaine visualisation ci-dessous!).
    </Text>
  );
}

export function BarChartNbPublicationsParType() {
  return (
    <Text size="lg" style={margin} align="justify">
      Combien y a-t-il eu de publications totales francophones de chaque type en
      2021? Il est intéressant de se pencher sur cette question après avoir vu
      les moyennes de likes de chaque type de publication. En effet, on peut
      remarquer qu'il y a un nombre tellement infime de publications de type
      IGTV que la barre ne s'affiche pas, puisqu'il n'y en a que 3 dans le jeu
      de données. Cela est particulièrement intéressant, car cela démontre que
      la distribution des likes pour les IGTV est uniquement concentrée dans les
      nombres de likes par milliers. Ce type de publication peut être un atout
      pour un bon taux d'engagement, malgré la conclusion de la visualisation
      précédente. On peut aussi remarquer que malgré le fait qu'il y a deux fois
      plus d'instances de photos que d'albums en 2021, les albums ont tout de
      même une moyenne de likes plus élevée que les photos. Cela renforce la
      preuve que les albums permettent un meilleur taux d'engagement.
    </Text>
  );
}

export function ScatterPlot() {
  return (
    <Text size="lg" style={margin} align="justify">
      Le nombre de likes de chaque publication francophone a été recueilli pour
      produire ce nuage de points. Plus d'un million de points constituent ce
      graphique et nous les avons classés en ordre de longueur de descriptions,
      qui vont de 1 à 2220 caractères. Il est possible d'observer une forte
      concentration de points dans les descriptions plus courtes, soit entre 1
      et 500. Il serait donc conseillé d'écrire des descriptions se retrouvant
      dans cette intervalle de longueur.
    </Text>
  );
}
