export default {
  async fetch(request, env) {
    //Printing headers https://developers.cloudflare.com/workers/examples/logging-headers/
    //Modules https://blog.cloudflare.com/workers-javascript-modules/
    //Compute HMAC examples
    //https://stackoverflow.com/questions/47329132/how-to-get-hmac-with-crypto-web-api
    //https://community.cloudflare.com/t/help-comparing-hmac/357091/4
    //https://developers.cloudflare.com/workers/examples/signing-requests/
    //https://stackoverflow.com/questions/67871458/verify-hmac-hash-using-cloudflare-workers
    //https://stackoverflow.com/questions/72315615/wrong-result-with-hmac-verification-using-subtlecrypto-in-javascript

    //decalre variables
    const haHost = env.HOMEASSISTANT_WEBHOOK
    const cfHeadId = env.CF_ZT_ST_ID
    const cfHeadSecret = env.CF_ZT_ST_SEC
    const talWhSecret = env.TAL_WEBHOOK_SECRET
    const talSigHeader = env.TAL_SIG_HEADER
    const talEventHeader = env.TAL_EVENT_HEADER 
    var talDigest = ''
    var computedDigest = ''
    var verified = ''
    var reqJsonString = await request.text();
    //var reqJsonString = JSON.stringify(await request.json()); 
    //var reqJsonString = await request.arrayBuffer();

    var headersObject = Object.fromEntries(request.headers);
    if (headersObject.hasOwnProperty(talSigHeader) && headersObject.hasOwnProperty(talEventHeader)){
      talDigest = headersObject[talSigHeader]

      //Verify HMAC
      const encoder = new TextEncoder();
      const secretKeyData = encoder.encode(talWhSecret);
      const key = await crypto.subtle.importKey("raw", secretKeyData,{ name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
      
      function byteStringToUint8Array(byteString) {
        const byteStringatob = atob(byteString);
        let ui = new Uint8Array(byteStringatob.length);
        for (let i = 0; i < byteStringatob.length; ++i) {
          ui[i] = byteStringatob.charCodeAt(i);
        }
        return ui;
      }
      const receivedMac = byteStringToUint8Array(talDigest);
      verified = await crypto.subtle.verify("HMAC", key, receivedMac, encoder.encode(reqJsonString));
      //Verify HMAC done

      //Compute HMAC
      let enc = new TextEncoder();
      let algorithm = { name: "HMAC", hash: "SHA-256" };
        
      let keyA = await crypto.subtle.importKey("raw", enc.encode(talWhSecret), algorithm, false, ["sign", "verify"]);
      let signature = await crypto.subtle.sign(algorithm.name, keyA, enc.encode(reqJsonString));
      const hashArray = Array.from(new Uint8Array(signature));
      computedDigest = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      computedDigest = btoa(computedDigest) 
      //computedDigest = btoa(String.fromCharCode(...new Uint8Array(signature)));
      //Compute HMAC done       

    } else {
      return new Response("", { status: 401, statusText: "Unauthorized" })
    }

    //Lets send our data to Home Assistant
    async function fetchURL(theHost, cfid, cfsec, passBody, talDigest, computedDigest, verified) {
      const response = await fetch(theHost, {
                                              method: 'POST',
                                              headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'CF-Access-Client-Id': cfid,
                                                'CF-Access-Client-Secret': cfsec,
                                                'takealotdigest': String(talDigest),
                                                'computeddigest': String(computedDigest),
                                                'digestverified': String(verified),
                                                'fromheaders': JSON.stringify(headersObject)
                                              },
                                              body: passBody
                                            });
      //const theHTML = await response.text();
      return 'OK'
    }
    //Lets call the function that calls our Home Assistant so we can get notified
    const results = await fetchURL(haHost, cfHeadId, cfHeadSecret, reqJsonString, talDigest, computedDigest, verified);

    //Always return OK even if things fail. I don't care about this now
    return new Response("OK", { status: 200, statusText: "OK" })
  
  }
}