CHROMIUM_BUILD_DIR=chromium-build
FIREFOX_BUILD_DIR=firefox-build

.PHONY: all clean firefox-build chromium-build

all: chromium-build firefox-build

chromium-build:
	mkdir -p ${CHROMIUM_BUILD_DIR}/
	cp -r css ${CHROMIUM_BUILD_DIR}/
	cp -r img ${CHROMIUM_BUILD_DIR}/
	cp -r js ${CHROMIUM_BUILD_DIR}/
	cp options.html ${CHROMIUM_BUILD_DIR}/
	cp popup.html ${CHROMIUM_BUILD_DIR}/
	cp chromium/manifest.json ${CHROMIUM_BUILD_DIR}/

firefox-build:
	mkdir -p ${FIREFOX_BUILD_DIR}/
	cp -r css ${FIREFOX_BUILD_DIR}/
	cp -r img ${FIREFOX_BUILD_DIR}/
	cp -r js ${FIREFOX_BUILD_DIR}/
	cp options.html ${FIREFOX_BUILD_DIR}/
	cp popup.html ${FIREFOX_BUILD_DIR}/
	cp firefox/manifest.json ${FIREFOX_BUILD_DIR}/
	cd ${FIREFOX_BUILD_DIR}/ && (find . -type f -not -name '*.xpi' -and -not -name '*.zip' | zip rss-finder.zip -@)
	mv ${FIREFOX_BUILD_DIR}/rss-finder.zip ${FIREFOX_BUILD_DIR}/rss-finder.xpi

clean:
	rm -rf ${CHROMIUM_BUILD_DIR}
	rm -rf ${FIREFOX_BUILD_DIR}
