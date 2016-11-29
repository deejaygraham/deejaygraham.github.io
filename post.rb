require 'optparse'
require 'fileutils'

options = {}

option_parser = OptionParser.new do | opts |
  opts.banner = "Usage: post.rb <post title> [options]"

  options[:tags] = ' '
  opts.on( '-t', '--tags TAGS', 'Comma delimited list of TAGS that apply to this post' ) do | tags |
     options[:tags] = tags
  end

  options[:image] = ''
  opts.on( '-i', '--img IMAGE', 'Path to image to include in post' ) do | image_path |
     options[:image] = image_path
  end

  options[:date] = Time.now.strftime("%Y-%m-%d")
  opts.on( '-d', '--date DATE', 'DATE of post' ) do | date |
     options[:date] = date
  end

  options[:extension] = '.markdown'
  opts.on( '-x', '--ext', 'file extension - defaults to markdown' ) do | x |
     options[:extension] = x
  end

  options[:layout] = 'post'
  opts.on( '-l', '--layout LAYOUT', 'Layout to use' ) do | l |
     options[:layout] = l
  end

  options[:publish] = false
  opts.on( '-p', '--publish', 'Mark for immediate publish' ) do
     options[:publish] = true
  end

  opts.on( '-h', '--help', 'Display this screen' ) do
     puts opts
     exit
   end
end

option_parser.parse!

if ARGV.empty?
  puts option_parser
  exit(-1)
end

# First argument must be the title of the post
title = ARGV[0]
# Use the post title to name the file and optional image file
safe_title = title.downcase.strip.gsub(' ', '-').gsub(',', '-')
# post_filename = options[:date] + '-' + safe_title + options[:extension]
# drafts shouldn't have a date...
post_filename = safe_title + options[:extension]

# If there is a drafts subfolder, create the post file
# there rather than in the current directory.
current_folder = Dir.pwd
posts_subfolder = '_drafts'
path_to_post_folder = File.join(current_folder, posts_subfolder)

path_to_post = Dir.exists?(path_to_post_folder) ? File.join(path_to_post_folder, post_filename) : File.join(current_folder, post_filename)
puts "Creating post in #{path_to_post} "


# Optional path to an image
# if set, we copy the image into the img folder
# and add a link to it in the body of the file
add_image_link = false

# check if image supplied - copy it and put a reference to it in the post
image_post_subfolder = 'img/posts'
path_to_image_posts_folder = File.join(current_folder, image_post_subfolder)
new_post_image_folder = File.join(path_to_image_posts_folder, safe_title)

# create directory for this post, even if we don't have an image yet.
Dir.mkdir(new_post_image_folder) unless Dir.exists?(new_post_image_folder)

if File.exists?(options[:image])
	add_image_link = true
	# get file name only
	# create new path and copy the file
	image_filename = File.split(options[:image])[1]

	FileUtils.cp(options[:image], new_post_image_folder)
	puts image_filename
end

# Generate the post content
yaml = {
  'layout' => "#{options[:layout]}",
  'title' => title,
  'published' => 'true',
  'tags' => "[ #{options[:tags]} ]"
}

yaml_delimiter = '---'

File.open(path_to_post, "w") do | file |

   # Front matter
   file.puts yaml_delimiter

   yaml.each do | key, value |
	file.puts key + ': ' + value + "\n"
   end

   file.puts yaml_delimiter

   # Main content
   file.puts
   file.puts '# ' + title
   file.puts

   if add_image_link
		file.puts 'Imported this image: '
		file.puts "![image](/#{image_post_subfolder}/#{safe_title}/#{image_filename})"
   else
	# Always struggle with the syntax and folder name for images.
		file.puts "![example image](/img/posts/#{safe_title}/example-image.png)"
   end

end
