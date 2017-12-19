import React from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Toast from 'react-native-easy-toast'
import { Actions } from 'react-native-router-flux'
import {
  Text as AnimatedText,
} from 'react-native-animatable'
import {
  Champions,
  Communication,
  Locales,
  Rank,
  Roles,
} from './components'
import styles from './styles'
import {
  icons,
} from '../../images'
import I18n from '../../i18n'
import { apiWrapper } from '../../utils'

class UserDetails extends React.Component {
  render() {
    const { own, selectedUser: {leagueProfile, communicationData}, displayUser } = this.props
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={styles.toast}
          textStyle={styles.toastText}
        />
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.closeButtonContainer}
        >
          <Image source={icons.cancel} style={styles.closeButton} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.scrollContainer}>
            {leagueProfile.description.length > 0
              && <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
                {I18n.t('userDetails_descriptionTitle')}
              </AnimatedText>}
            {leagueProfile.description.length > 0
              && <AnimatedText style={styles.description} animation="fadeInRight" duration={300}>
                {leagueProfile.description}
              </AnimatedText>}
            <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
              {I18n.t('userDetails_ranksTitle')}
            </AnimatedText>
            <Rank
              rankedData={leagueProfile.rankedData}
              queueType="RANKED_SOLO_5x5"
            />
            <Rank
              rankedData={leagueProfile.rankedData}
              queueType="RANKED_FLEX_SR"
            />
            <Rank
              rankedData={leagueProfile.rankedData}
              queueType="RANKED_TEAM_3x3"
            />
            {leagueProfile.roles.length > 0
              && <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
                {I18n.t('userDetails_favoriteRolesTitle')}
              </AnimatedText>}
            {leagueProfile.roles.length > 0
              && <Roles roles={leagueProfile.roles} />}
            {leagueProfile.champions.length > 0
              && <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
                {I18n.t('userDetails_favoriteChampionsTitle')}
              </AnimatedText>}
            {leagueProfile.champions.length > 0
              && <Champions champions={leagueProfile.champions} />}
            {leagueProfile.locales.length > 0
              && <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
                {I18n.t('userDetails_localesTitle')}
              </AnimatedText>}
            {leagueProfile.locales.length > 0
              && <Locales locales={leagueProfile.locales} />}
            <AnimatedText style={styles.sectionTitle} animation="fadeInRight" duration={300}>
              {I18n.t('userDetails_communicationTitle')}
            </AnimatedText>
            <Communication data={communicationData} />
            {own
              ? <TouchableOpacity
                onPress={() => apiWrapper
                  .updateLeagueRankedData()
                  .then(() => {
                    this.refs.toast.show(I18n.t('userDetails_profileUpdated'))
                    apiWrapper
                      .getProfilePreview()
                      .then(r => displayUser(r.data))
                  })
                }
              >
                <Text style={{textAlign: 'center'}}>{I18n.t('userDetails_update')}</Text>
              </TouchableOpacity>
              : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}

UserDetails.propTypes = {
  displayUser: PropTypes.func,
  own: PropTypes.bool,
  selectedUser: PropTypes.object,
}

UserDetails.defaultProps = {
  selectedUser: {},
  own: false,
  displayUser: () => null,
}

export default UserDetails
