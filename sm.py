
from pubnub.pubnub import PubNub
from pubnub.pnconfiguration import PNConfiguration
from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory

import uuid
 






pnconfig = PNConfiguration()
pnconfig.subscribe_key = "sub-c-5bdd008c-6d97-11e8-a49b-66b3abd5adf6"
pnconfig.publish_key = "pub-c-2bda6cf3-c455-4b28-bbed-00611b461f98"
pnconfig.ssl = False
 
pubnub = PubNub(pnconfig)




#publish
def publish_callback(result, status):
    pass
    # Handle PNPublishResult and PNStatus
    print(result)
    print(status)
 
pubnub.publish().channel('ch1').message(['hello', 'there']).async(publish_callback)



